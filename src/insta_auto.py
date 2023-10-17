import data
import os
import pyperclip
import random
import time

from lxml import etree
from instagrapi import Client
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# 인스타그램 로그인 
def insta_login(driver):
    try:
        driver.get("https://www.instagram.com/")
        id_selector = "#loginForm > div > div:nth-child(1) > div > label > input"

        WebDriverWait(driver, 10).until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, id_selector)
        ))
        
        id_input = driver.find_element(By.CSS_SELECTOR, id_selector)
        id_input.click()        
        time.sleep(0.3)        
        pyperclip.copy(data.id)
        actions = ActionChains(driver)
        actions.key_down(Keys.CONTROL).send_keys('v').key_up(Keys.CONTROL).perform()

        time.sleep(0.5)

        pw_selector = "#loginForm > div > div:nth-child(2) > div > label > input"
        pw_input = driver.find_element(By.CSS_SELECTOR, pw_selector)
        pw_input.click()
        time.sleep(0.3)        
        actions = ActionChains(driver)
        pyperclip.copy(data.pw)
        actions.key_down(Keys.CONTROL).send_keys('v').key_up(Keys.CONTROL).perform()


        time.sleep(0.5)
        login_btn_selector = "#loginForm > div > div:nth-child(3) > button"
        login_btn = driver.find_element(By.CSS_SELECTOR, login_btn_selector)
        login_btn.click()
        
        if check_bot_detection(driver):
            print('[봇 탐지] 로그인이 불가능합니다. 다른 계정으로 시작해주세요.')
            time.sleep(1)
            return 
        else:
            time.sleep(3)

    except Exception as e:
        print(e)
        print('로그인 에러 발생!')

# 해시태그 검색, 검색 결과 피드 링크 추출
def search_results_extract(keyword, target_cnt):
    if os.path.exists('links.txt'):
        os.remove('links.txt')
    
    # 로그인
    print(f'[{keyword}] 해시태그 검색을 시작합니다.')
    start = time.time()
    cl = Client()
    cl.login(data.id, data.pw) 
    
    try:
        # 검색결과 피드 불러오기 (최신)
        results = cl.hashtag_medias_v1(name=keyword, amount=target_cnt, tab_key="recent")
        time.sleep(3)
        
        # 피드에서 url 추출
        links = []
        for each_post in results:
            post_dict = each_post.dict()
            url = "https://www.instagram.com/p/"+ str(post_dict['code'])
            links.append(url)
        links = list(set(links)) # 중복제거
        
        # 추출한 url을 links.txt 파일로 덤프
        with open('links.txt', "a") as f:
            for link in links:
                f.write(f"{link}\n")
        print(f"[{keyword}] 해시태그의 검색결과에 대한 링크 추출이 완료되었습니다. links.txt 파일을 확인해보세요.")
    
    except Exception as e:
        print(e)
        print("해시태그 검색 결과 피드 링크 추출 중 오류가 발생했습니다. ")
    finally:
        # 세션 해지를 위해 로그아웃
        cl.logout()
        print('로그아웃합니다.')
        time.sleep(2)
        end = time.time()
        print(f'해시태그 추출 작업시간 : {end-start-2 :.2f} 초')

# 추출한 링크가 들어있는 links.txt 파일 read
def read_links():
    links = []
    with open('links.txt',"r") as f:
        while True:
            line = f.readline()
            if not line:
                break
            links.append(line.rstrip())
    return links

# 인스타 봇 작업 로직
def insta_auto_bot(driver, target_cnt):
    links = read_links()    
    
    cnt = 1 # n번째 링크    
    like_result = 0 # 실제 좋아요가 된 건수
    comment_result = 0 # 실제 댓글달기가 된 건수
    follow_result = 0 # 실제 팔로잉을 한 건수
    
    print(f'총 {target_cnt}건의 링크에 대한 자동봇 작업을 시작합니다.')
    for url in links:
        print(f'\n{cnt}번째 링크에 대한 작업을 시작합니다.({url})')
        driver.get(url)        
        
        if check_wrong_access(driver):
            print("게시글이 삭제되었거나 잘못된 url 접근입니다. 다음 링크에 대한 작업을 시작합니다.")
            cnt += 1
            continue
        
        if like_post(driver):
            like_result += 1
        if comment_post(driver):
            comment_result += 1
        if follow_user(driver):
            follow_result +=1
        
        if cnt < target_cnt:
            cnt += 1
            random_time = random.randrange(180.0, 300.0)
            print(f'{random_time}초 대기 후 작업을 다시 시작합니다.')
            time.sleep(random_time)
        else:
            pass
    
    print(f'\n요청받은 {target_cnt}건의 링크에 대한 봇 작업이 완료되었습니다.')
    print(f'결과 : 좋아요 {like_result}건, 댓글 {comment_result}건, 팔로우 {follow_result}건 ')

# 유효 url 체크
def check_wrong_access(driver):
    try: 
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((
            By.XPATH, '//*[contains(text(), "죄송합니다. 페이지를 사용할 수 없습니다.")]'
        )))
        return True
    except TimeoutException: 
        time.sleep(random.uniform(0.7, 4.0))
        return False

# 좋아요
def like_post(driver):
    try: 
        like_span = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((
                By.XPATH, '//*[@aria-label="좋아요" or @aria-label="좋아요 취소"]//ancestor :: span[2]'
            )))
        if like_span:
            post_like_span = like_span[-1]
            like_btn = post_like_span.find_element(By.TAG_NAME, 'div')
            btn_svg = like_btn.find_element(By.TAG_NAME, 'svg') 
            svg = btn_svg.get_attribute('aria-label')
            
        if svg == '좋아요' : 
            like_btn.click() 
            print('좋아요를 눌렀습니다.') 
            time.sleep(random.uniform(0.7, 5.0))
            if check_bot_detection(driver):
                print("[봇 탐지!] 좋아요 작업을 시도할 수 없습니다. 다음 작업을 수행합니다.")
            else:
                return True
            time.sleep(random.uniform(0.9, 5.0))
        else :
            print('이미 작업한 피드입니다.')
            time.sleep(random.uniform(2.0, 6.0))
    except Exception as e:
        print(e)
        print("좋아요 작업중 오류가 발생했습니다.")
    time.sleep(3)
    return False

# 댓글
def comment_post(driver):
    try:
        # 1. already_commenting_url.txt 파일을 읽는다.
        # 2. 한줄한줄 읽어 내려가면서 지금 들어간 url이 있는지 확인
        # 3. 없으면 진행, 있으면 해당 함수 종료 
        with open('./already_commenting_url.txt', 'r') as f:
            urls = f.read().splitlines()
            if driver.current_url in urls:
                print("이미 댓글을 작성한 피드입니다. 다음 작업을 수행합니다.")
                return False
        comment_path = driver.find_element(By.XPATH, '//textarea[@aria-label="댓글 달기..."]')
        comment_path = WebDriverWait(driver, 10).until(EC.presence_of_element_located((
                By.XPATH, '//textarea[@aria-label="댓글 달기..."]'
        )))
        
        if comment_path:
            comment_path.click()
            comment_path = driver.find_element(By.TAG_NAME, 'textarea')
            driver.implicitly_wait(1)
            
            comments = ["잘 보고 가용❤️", "❤️맞팔해요!❤️❤️", "팔로하고 갑니당~❤️"]
            comment = random.choice(comments)
            
            for word in comment:
                comment_path.send_keys(word)
                time.sleep(random.uniform(0.03,0.09))
            comment_path.send_keys(Keys.ENTER)
            print("댓글 작성이 완료되었습니다.")
            

            if check_bot_detection(driver):
                print("[봇 탐지!] 댓글 작업을 시도할 수 없습니다. 다음 작업을 수행합니다.")
            else:                    
                # 4. 댓글작성이 완료되었다면 already_commenting_url.txt에 해당 url을 추가한다.
                with open('./already_commenting_url.txt', "a") as f:
                    f.write(f"{driver.current_url}\n")
                return True
    except Exception as e:
        # print(e)
        print('이 게시물에 대한 댓글 기능이 제한되었습니다. 다음 작업을 수행합니다.')
        time.sleep(3)
    return False

# 팔로우
def follow_user(driver):
    try: 
        follow_btn = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((
                By.XPATH, '//*[contains(text(), "팔로잉") or contains(text(), "팔로우")]'
            )))
        follow_btn_txt = follow_btn.accessible_name
        
        if follow_btn_txt == '팔로우':
            follow_btn.click()
            print("팔로우가 완료되었습니다.")
            if check_bot_detection(driver):
                print("[봇 탐지!] 팔로우를 시도할 수 없습니다. 다음 작업을 수행합니다.")
            else:                    
                time.sleep(random.uniform(0.9, 5.0))    
                return True
        else:
            print("이미 팔로우한 사용자입니다. 다음 작업을 수행합니다.")
            time.sleep(random.uniform(2.0, 6.0))
    except Exception as e:
        print(e)
        print('팔로잉 에러.')
    return False

# 봇 탐지 체크
def check_bot_detection(driver):
    try:
        bot_detection = WebDriverWait(driver, 3).until(EC.presence_of_element_located((
                By.XPATH, '//*[contains(text(), "나중에 다시 시도하세요") or contains(text(), "Instagram은 커뮤니티를 보호하기 위해 특정 활동을 제한합니다.") or contains(text(), "문제 신고") or contains(text(), "몇 분 후에 다시 시도해주세요.") or contains(text(), "잘못된 비밀번호입니다. 다시 확인하세요.") or contains(text(), "자동화")]'
            )))
        if bot_detection:
            print("봇 탐지가 확인되었습니다.")
            ok_btn = WebDriverWait(driver, 3).until(EC.presence_of_element_located((
                By.XPATH, "//button[contains(text(), '확인') or button[contains(text(), '닫기')]]"
            )))
            ok_btn.click()
            time.sleep(3)
            return True
        else:
            return False
    except TimeoutException: 
        time.sleep(random.uniform(0.7, 4.0))
        return False

# 인스타 자동 언팔로우 기능
def insta_auto_unfollow(driver):
    print('언팔로우 작업을 시작합니다.')     
    driver.get(f"https://www.instagram.com/{data.id}/")    
    following_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((
        By.XPATH, '//*[contains(text(), "팔로우")]/span'
    )))    
    following_cnt = following_element.text    
    follower_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((
        By.XPATH, '//*[contains(text(), "팔로워")]/span'
    )))
    follower_cnt = follower_element.text
    
    # print(f'내가 팔로잉하고 있는 계정 수: {following_cnt}')
    # print(f'내 계정의 팔로워 수: {follower_cnt}')
    
    try: 
        following_list = get_following_list(driver, data.id, following_cnt)
        follower_list = get_follower_list(driver, data.id, follower_cnt)
        unfollow_list = [x for x in following_list if x not in follower_list]
        
        if not unfollow_list ==[] :
            print(f'상호 팔로우가 되지 않은 계정입니다.  : {unfollow_list}')
            print('상호 팔로우가 되지 않은 계정들에 대하여 언팔로우를 진행합니다.')
            
            cnt = 1
            unfollow_cnt = len(unfollow_list)
            for unfollow_id in unfollow_list:
                driver.get(f"https://www.instagram.com/{unfollow_id}")
            
                following_popup_btn = WebDriverWait(driver, 10).until(EC.presence_of_element_located((
                    By.XPATH, '//*[contains(text(), "팔로잉")]/ancestor::div[2]'
                )))
                following_popup_btn.click()
                time.sleep(random.uniform(3, 5))
                
                unfollow_btn = WebDriverWait(driver, 10).until(EC.presence_of_element_located((
                    By.XPATH, '//*[contains(text(), "팔로우 취소")]/ancestor::div[7]'
                )))
                time.sleep(random.uniform(3, 5))
                unfollow_btn.click()
                print(f'{unfollow_id} 계정을 언팔로우했습니다.')
                cnt += 1
            
            if cnt < unfollow_cnt:
                random_time = random.randrange(5.0, 30.0)
                print(f'{random_time}초 대기 후 작업을 다시 시작합니다.')
                time.sleep(random_time)
            else:
                print(f'총 {unfollow_cnt}건의 언팔로우 작업이 완료되었습니다.')
                pass
        
        else: 
            print('나를 팔로우한 모든 계정과 맞팔로우가 되어있습니다.')
            print('언팔로우 작업을 종료합니다.')

    except Exception as e:
        print(e)
        print('[언팔로우] 작업 도중 에러가 발생했습니다.')

SCROLL_PAUSE_TIME = 0.5
VIEW_USER_COUNT = 12
def get_following_list(driver, username, following_cnt):
    try: 
        driver.get(f"https://www.instagram.com/{username}/following/")
        
        following_list_xPath = '//*[contains(text(), "팔로잉")]//ancestor::div[3]/following-sibling::div[3]'
        following_list_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((
            By.XPATH, following_list_xPath
        )))
        time.sleep(1)
        
        # 팔로잉하는 계정의 숫자가 12보다 많다면 스크롤을 내린다.       
        if(int(following_cnt) > VIEW_USER_COUNT):         
            scroll_position = 0
            popup_height = following_list_element.size['height']
            browser_height = driver.execute_script("return window.innerHeight")
            last_height = driver.execute_script("return arguments[0].scrollTop;", following_list_element)
            
            while True:
                scroll_position += browser_height
                driver.execute_script("arguments[0].scrollTop += arguments[1];", following_list_element, popup_height)
                time.sleep(SCROLL_PAUSE_TIME)
                
                new_scroll_position = driver.execute_script("return arguments[0].scrollTop;", following_list_element)

                if new_scroll_position == last_height:
                    break
                last_height = new_scroll_position

        # 팔로잉한 계정 id 값을 추출한다.
        page_source = driver.page_source
        tree = etree.HTML(page_source)
        following_list = []
        
        elements = tree.xpath('//div[contains(text(), "팔로잉")]/ancestor::div[3]/following-sibling::div[3]/div[1]//a/@href')
        elements = list(set(elements))  
        
        cnt = 1
        for e in elements :
            following_id = e.replace('/', '')
            following_list.append(following_id)
            cnt += 1
        
        return following_list
        
    except Exception as e:
        print(e)
        print('[언팔로우] 팔로잉 리스트 추출 중 에러가 발생했습니다.')
        return []

def get_follower_list(driver, username, follower_cnt):
    try:
        driver.get(f"https://www.instagram.com/{username}/followers/")
        follower_list_xPath = '//div[contains(text(), "팔로워")]//ancestor::div[3]/following-sibling::div[2]'
        follower_list_element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((
            By.XPATH, follower_list_xPath
        )))
        time.sleep(1)
        
        # 팔로잉하는 계정의 숫자가 12보다 많다면 스크롤을 내린다.
        if(int(follower_cnt) > VIEW_USER_COUNT): 
            scroll_position = 0
            popup_height = follower_list_element.size['height']
            browser_height = driver.execute_script("return window.innerHeight")
            last_height = driver.execute_script("return arguments[0].scrollTop;", follower_list_element)
            while True:
                scroll_position += browser_height
                driver.execute_script("arguments[0].scrollTop += arguments[1];", follower_list_element, popup_height)
                time.sleep(SCROLL_PAUSE_TIME)
                
                new_scroll_position = driver.execute_script("return arguments[0].scrollTop;", follower_list_element)

                if new_scroll_position == last_height:
                    break
                last_height = new_scroll_position
        
        follower_list = []
        page_source = driver.page_source
        tree = etree.HTML(page_source)
        
        elements = tree.xpath('//div[contains(text(), "삭제")]/ancestor::div[3]/div[2]//a/@href')
        elements = list(set(elements))

        for e in elements :
            follower_id = e.replace('/', '')
            follower_list.append(follower_id)

        return follower_list
    except Exception as e:
        print(e)
        print('[언팔로우] 팔로워 리스트 추출 중 에러가 발생했습니다.')
        return []

def insta_web_work(driver, keyword, target_cnt):
    search_results_extract(keyword, target_cnt)
    insta_auto_bot(driver, target_cnt)

# 인스타그램 해시태그 검색 시작
# 현재 사용하고 있지 않은 로직입니다. (2023-10-04)
def insta_web_hashtag_search(driver, keyword):
    try:
        time.sleep(3)
        print(f"{keyword} 키워드로 해시태그 검색을 시작합니다.")
        driver.get(f"https://www.instagram.com/explore/tags/{keyword}/")
    except Exception as e:
        print(e)
        print("[에러] insta_web_hashtag_search > 해시태그 검색 중 에러 발생!")

# 해시태그 검색 결과 피드 링크 추출
# 현재 사용하고 있지 않은 로직입니다. (2023-10-04)
def insta_web_link_extract(driver, target_cnt):
    # id가 'mount_0_0'으로 시작하는 posting selector를 가져온다
    all_posting_sel = "div[id^='mount_0_0'] > div "
    
    # 조건을 만족하는 특정 요소가 존재할 때까지 10초 기다림(timeout) / 조건: all_posting_sel에 해당하는 CSS_Selector 요소가 화면에 뜰 때까지
    WebDriverWait(driver, 10).until(EC.presence_of_element_located(
        (By.CSS_SELECTOR, all_posting_sel)
    )) 
    
    all_posting_box = driver.find_element(By.CSS_SELECTOR, all_posting_sel)    
    
    ''' 목표 링크 n개 추출하기'''    
    # 목표 횟수보다 검색결과 피드의 수가 적다면 루프 종료하는 구문 추가해야 함 근데 어케해????
    links = []
    loop_cnt = 0
    prev_links_length = 0

    time.sleep(10)
    while len(links) < target_cnt :
        try:
            loop_cnt +=1
            # print(f"{loop_cnt}번째 루프입니다.")
            # 6번 스크롤 내리기(충분히 포스팅 개수가 쌓일만큼 스크롤 하기)
            # 현재 인스타그램 해시태그 검색결과 피드가 무한 로딩으로 제공되지 않기 때문에 주석처리 (2023-09-22)            
            # for _ in range(6):
            #     driver.execute_script("window.scrollBy(0,600);")
            #     time.sleep(0.3)

            # 피드의 href 추출
            all_posting_box = driver.find_element(By.CSS_SELECTOR, all_posting_sel)
            post_links = all_posting_box.find_elements(By.TAG_NAME, "a") 
            
            cnt = 0
            for eachLink in post_links:
                link = eachLink.get_attribute('href')
                if "/p/" in link:
                    links.append(link)
                    cnt += 1
                    print(f"{cnt} 번째 링크를 생성했습니다.")
            links = list(set(links)) # 중복 링크 제거 및 set -> list 형 변환
            
            if loop_cnt > 3 and len(links) == prev_links_length:
                break
            
            # 이전 루프에서의 links 길이를 업데이트
            prev_links_length = len(links)
            
        except Exception as e:
            print(e)
            print("[에러] insta_web_link_extract > while 에러 발생!")
            
    
    with open('links.txt', "a") as f:
        for link in links:
            # print(link)
            f.write(f"{link}\n")