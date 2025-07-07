pipeline {
  agent any

  environment {
    // Nothing here — we'll load them in a stage below
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Debug Credentials') {
      steps {
        withCredentials([usernamePassword(credentialsId: '40abe281-b26c-4882-bce3-00db98efa524', 
                                          usernameVariable: 'BROWSERSTACK_USERNAME', 
                                          passwordVariable: 'BROWSERSTACK_ACCESS_KEY')]) {
          sh 'echo "BROWSERSTACK_USERNAME: $BROWSERSTACK_USERNAME"'
          sh 'echo "BROWSERSTACK_ACCESS_KEY: $BROWSERSTACK_ACCESS_KEY"'
        }
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        withCredentials([usernamePassword(credentialsId: '40abe281-b26c-4882-bce3-00db98efa524',
                                          usernameVariable: 'BROWSERSTACK_USERNAME',
                                          passwordVariable: 'BROWSERSTACK_ACCESS_KEY')]) {
          sh 'npx mocha tests/loginFavoriteSamsung.test.js'
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

