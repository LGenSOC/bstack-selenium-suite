pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Debug Credentials') {
      steps {
        withCredentials([usernamePassword(credentialsId: '40abe281-b26c-4882-bce3-00db98efa524', usernameVariable: 'BROWSERSTACK_USERNAME', passwordVariable: 'BROWSERSTACK_ACCESS_KEY')]) {
          sh 'echo "BROWSERSTACK_USERNAME: $BROWSERSTACK_USERNAME"'
          sh 'echo "BROWSERSTACK_ACCESS_KEY: $BROWSERSTACK_ACCESS_KEY"'
        }
      }
    }

    stage('Test') {
      steps {
        withCredentials([usernamePassword(credentialsId: '40abe281-b26c-4882-bce3-00db98efa524', usernameVariable: 'BROWSERSTACK_USERNAME', passwordVariable: 'BROWSERSTACK_ACCESS_KEY')]) {
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
  }

  post {
    always {
      echo 'Pipeline finished.'
      archiveArtifacts artifacts: '**/test-results/*.xml', allowEmptyArchive: true
      junit '**/test-results/*.xml'
    }
  }
}

