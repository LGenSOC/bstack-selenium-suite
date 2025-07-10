pipeline {
  agent any  // ensures node context for all stages and post blocks

  environment {
    BROWSERSTACK_USERNAME = credentials('inesbrown_gMa9mb')
    BROWSERSTACK_ACCESS_KEY = credentials('40abe281-b26c-4882-bce3-00db98efa524')
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
  }

  post {
    always {
      echo 'Tests completed'
      archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
    }
  }
}
