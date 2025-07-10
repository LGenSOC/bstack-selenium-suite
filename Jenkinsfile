pipeline {
  agent any

  environment {
    // Use the ID of the credential that stores the username secret
    BROWSERSTACK_USERNAME = credentials('browserstack-username')
    // Use the ID of the credential that stores the access key secret
    BROWSERSTACK_ACCESS_KEY = credentials('browserstack-access-key')
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

    stage('Run Tests') {
      steps {
        sh '''
          npx cross-env \\
          BROWSER=chrome \\
          OS=Windows \\
          OS_VERSION=10 \\
          BROWSERSTACK_USERNAME=$BROWSERSTACK_USERNAME \\
          BROWSERSTACK_ACCESS_KEY=$BROWSERSTACK_ACCESS_KEY \\
          npx mocha tests/loginFavoriteSamsung.test.js
        '''
      }
    }
  }

  post {
    always {
      script {
        node {
          sh 'pwd'
          sh 'ls -la reports || echo "reports folder missing"'
          echo 'Tests completed'
          archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
        }
      }
    }
  }
}