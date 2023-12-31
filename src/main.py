# import chromedriver_autoinstaller
import insta_auto 
import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Selenium Drvier 생성
# chromedriver_autoinstaller.install()
# chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\Chrome.exe"
options = webdriver.ChromeOptions()
options.add_argument("--disable-logging")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_experimental_option("detach", True)
chrome_service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(options = options, service = chrome_service)

IS_LOGGED_IN = False
auto_yn = True
unfollow_yn = False
try: 
    if auto_yn: 
        # keyword_list = ['맞팔환영']
        
        keyword_list = []
        keyword_input = input('해시태그를 입력해주세요. :')
        target_cnt = input('추출할 계정의 수를 입력해주세요. (숫자만 입력 가능): ')
        keyword_list.append(keyword_input)
        
        
        for keyword in keyword_list:
            keyword = keyword.replace(" ","")        
            target_cnt = int(target_cnt) # 목표 작업 건수       
            if not IS_LOGGED_IN:
                insta_auto.insta_login(driver)
                IS_LOGGED_IN = True
            
            start = time.time()
            insta_auto.insta_web_work(driver, keyword, target_cnt)
            end = time.time()
            print(f'[{keyword}] 해시태그 자동봇 작업 시간 : {end-start :.2f} 초')

    if unfollow_yn:
            if not IS_LOGGED_IN:
                insta_auto.insta_login(driver)
                IS_LOGGED_IN = True
            start = time.time()
            insta_auto.insta_auto_unfollow(driver)
            end = time.time()
            print(f'자동 언팔로우 작업 시간 : {end-start:.2f} 초')
    
    print("자동화 프로그램 동작이 완료되었습니다.")
    time.sleep(3)
    driver.quit()
    
except Exception as e:
    print(e)
    print("작업 도중 오류가 발생했습니다.")
    time.sleep(3)
    driver.quit()