pipeline {
  agent any

  environment {
    BROWSERSTACK_USERNAME = credentials('inesbrown_gMa9mb')
    BROWSERSTACK_ACCESS_KEY = credentials('LJEAxKYyRkApfUgXsq4j')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Debug Credentials') {
      steps {
        sh 'echo "BROWSERSTACK_USERNAME: $BROWSERSTACK_USERNAME"'
        sh 'echo "BROWSERSTACK_ACCESS_KEY: $BROWSERSTACK_ACCESS_KEY"'
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        script {
          try {
            sh 'npx mocha tests/loginFavoriteSamsung.test.js'
          } catch (err) {
            currentBuild.result = 'FAILURE'
            throw err
          }
        }
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
      archiveArtifacts artifacts: '**/test-results/*.xml', allowEmptyArchive: true
      junit '**/test-results/*.xml'
    }
  }
}

