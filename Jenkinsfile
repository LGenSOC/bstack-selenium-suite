pipeline {
  agent any
  environment {
    BROWSERSTACK_USERNAME = credentials('browserstack-username')
    BROWSERSTACK_ACCESS_KEY = credentials('browserstack-access-key')
  }
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Run Tests') {
      parallel {
        stage('Windows Chrome') {
          steps {
            withEnv(['BROWSER=Chrome', 'OS=Windows', 'OS_VERSION=10']) {
              sh 'npx mocha tests/loginFavoriteSamsung.test.js --reporter mocha-junit-reporter --reporter-options mochaFile=results/windows-chrome.xml'
            }
          }
        }
        stage('macOS Firefox') {
          steps {
            withEnv(['BROWSER=Firefox', 'OS=OS X', 'OS_VERSION=Ventura']) {
              sh 'npx mocha tests/loginFavoriteSamsung.test.js --reporter mocha-junit-reporter --reporter-options mochaFile=results/macos-firefox.xml'
            }
          }
        }
        stage('Samsung Galaxy S22') {
          steps {
            withEnv(['BROWSER=Chrome', 'DEVICE=Samsung Galaxy S22']) {
              sh 'npx mocha tests/loginFavoriteSamsung.test.js --reporter mocha-junit-reporter --reporter-options mochaFile=results/galaxy-s22.xml'
            }
          }
        }
      }
    }
    stage('Publish Results') {
      steps {
        junit 'results/*.xml'
      }
    }
  }
}


