import sys
import time

from instagrapi import Client

from PyQt5 import QtWidgets
from PyQt5.QtWidgets import *
from PyQt5.QtWidgets import QWidget
from PyQt5.QtCore import *
from PyQt5.uic import loadUi

from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


chrome_service = Service(ChromeDriverManager().install())
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--disable-logging")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_experimental_option("detach", True)

is_logged_in = False
class LoginWindow(QDialog):
    def __init__(self):
        super(LoginWindow, self).__init__()
        self.fn = "members.txt"
        loadUi("login.ui", self)
        self.pw.setEchoMode(QtWidgets.QLineEdit.Password)
        
        self.login_attempts = 0 # 로그인 시도 횟수
        
        # 타이머 설정 (60초 동안 로그인 잠금)
        self.login_lock_timer = QTimer(self)
        self.login_lock_timer.setSingleShot(True)
        self.login_lock_timer.timeout.connect(self.unlock_login)
        self.login_btn.clicked.connect(self.login)

    def login(self):
        id = self.id.text()
        pw = self.pw.text()
        
        if not id or not pw:
            QMessageBox.critical(self, ' ', '아이디와 비밀번호를 모두 입력해주세요.', QMessageBox.Ok)
            return
        
        member_list = self.readFile()
        bFind = False
        for _id, _pw in member_list:
            if id == _id and pw == _pw :
                bFind = True
                break
        
        if bFind:
            QMessageBox.information(self, ' ', '로그인 성공', QMessageBox.Ok)
            widget.addWidget(MainWindow())
            widget.setCurrentIndex(widget.currentIndex() + 1)
            
            
        else:
            self.login_attempts += 1
            if self.login_attempts < 5:
                QMessageBox.critical(self, ' ', '아이디와 비밀번호를 확인해주세요.', QMessageBox.Ok)
            elif self.login_attempts == 5 :
                QMessageBox.critical(self, ' ', f'로그인 {self.login_attempts}회 실패. 잠시 후 다시 시도해주세요.', QMessageBox.Ok)
                self.login_btn.setEnabled(False)  # 로그인 버튼 비활성화
                self.login_lock_timer.start(60000)  # 60초 동안 로그인 잠금 시작
    
    # 로그인 잠금 해제
    def unlock_login(self):        
        self.login_attempts = 0
        self.login_btn.setEnabled(True) 
        QMessageBox.information(self, ' ', '로그인 잠금이 해제되었습니다. 다시 시도하세요.', QMessageBox.Ok)
        
        self.login_lock_timer.stop()
    
    def readFile(self):
        member_list = []
        with open(self.fn, 'r', encoding='utf-8') as f:
            while True:
                line = f.readline()
                if not line:
                    break
                line = line.replace('\n', '')
                id, pw = line.split(' ')
                member_list.append((id, pw))       
        return member_list


class InstaLoginWindow(QDialog):
    def __init__(self):
        super(InstaLoginWindow,self).__init__()
        loadUi("insta_login.ui",self)        
        self.insta_login_btn.clicked.connect(self.insta_login)
        self.insta_pw.setEchoMode(QtWidgets.QLineEdit.Password)

    def insta_login(self):
        insta_id = self.insta_id.text()
        insta_pw = self.insta_pw.text()        
        
        if not insta_id or not insta_pw:
            QMessageBox.critical(self, ' ', '아이디와 비밀번호를 모두 입력해주세요.', QMessageBox.Ok)
            return        
        try:
            cl = Client()
            result = cl.login(insta_id, insta_pw) 
            if result:
                QMessageBox.information(self, ' ', '인스타그램 계정 등록이 완료되었습니다.', QMessageBox.Ok)
                time.sleep(5)
                cl.logout()
                
                # main window로 id 정보 넘기는 로직 필요
            
        except Exception as e: 
            print(e)
            print('[인스타그램 로그인] 에러 발생')
            QMessageBox.critical(self, ' ', '아이디와 비밀번호를 확인해주세요.', QMessageBox.Ok)


class MainWindow(QMainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()
        loadUi('main_window.ui', self)        
        self.btn_manage_insta_id.clicked.connect(self.insta_id_manage)
        self.insta_login_widget = None # 인스턴스 초기화
    
        self.id_label = QLabel('ID: ', self)
        self.id_label.move(10, 10)
    
    def set_logged_in_id(self, id):
        self.id_label.setText(f'ID: {id}')
    
    # 게시물 작업 탭 화면 (MAIN)
    def insta_feed_manage_page(self):
        print('게시물 작업 화면')
    
    # 인스타그램 계정설정 위젯
    def insta_id_manage(self):
        if not self.insta_login_widget:
            self.insta_login_widget = InstaLoginWindow()  # 처음 호출될 때만 창을 생성
        self.insta_login_widget.show()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = LoginWindow()
    widget = QtWidgets.QStackedWidget()
    
    widget.addWidget(window)
    window.show()
    widget.show()
    app.exec_()
    # widget.setFixedWidth(480)
    # widget.setFixedHeight(620)
    