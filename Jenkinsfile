pipeline {
  agent any

  environment {
    BROWSERSTACK_USERNAME = credentials('browserstack-username') // Your Jenkins credentials ID
    BROWSERSTACK_ACCESS_KEY = credentials('browserstack-access-key') // Your Jenkins credentials ID
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/LGenSOC/bstack-selenium-suite.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Tests in Parallel on BrowserStack') {
      parallel {
        stage('Windows 10 - Chrome') {
          steps {
            sh '''
              npx cross-env \
              BROWSER=chrome \
              OS=Windows \
              OS_VERSION=10 \
              BROWSERSTACK_USERNAME=$BROWSERSTACK_USERNAME \
              BROWSERSTACK_ACCESS_KEY=$BROWSERSTACK_ACCESS_KEY \
              npx mocha tests/loginFavoriteSamsung.test.js
            '''
          }
        }
        stage('macOS Ventura - Firefox') {
          steps {
            sh '''
              npx cross-env \
              BROWSER=firefox \
              OS="OS X" \
              OS_VERSION=Ventura \
              BROWSERSTACK_USERNAME=$BROWSERSTACK_USERNAME \
              BROWSERSTACK_ACCESS_KEY=$BROWSERSTACK_ACCESS_KEY \
              npx mocha tests/loginFavoriteSamsung.test.js
            '''
          }
        }
        stage('Samsung Galaxy S22 (Real Device)') {
          steps {
            sh '''
              npx cross-env \
              DEVICE="Samsung Galaxy S22" \
              REAL_MOBILE=true \
              OS_VERSION="12.0" \
              BROWSERSTACK_USERNAME=$BROWSERSTACK_USERNAME \
              BROWSERSTACK_ACCESS_KEY=$BROWSERSTACK_ACCESS_KEY \
              npx mocha tests/loginFavoriteSamsung.test.js
            '''
          }
        }
      }
    }
  }

  post {
    always {
      echo 'Tests completed'
      archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
    }
  }
}



