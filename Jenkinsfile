pipeline {
  agent any

  environment {
    BROWSERSTACK_USERNAME = credentials('inesbrown_gMa9mb')
    BROWSERSTACK_ACCESS_KEY = credentials('LJEAxKYyRkApfUgXsq4j')
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npx mocha tests/loginFavoriteSamsung.test.js'
      }
    }
  }
}
