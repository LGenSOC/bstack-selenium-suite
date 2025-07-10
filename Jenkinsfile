pipeline {
  agent any

  environment {
    // These are now correctly set up and masked in the logs, GREAT!
    BROWSERSTACK_USERNAME = credentials('browserstack-username') // Use the ID you set
    BROWSERSTACK_ACCESS_KEY = credentials('browserstack-access-key') // Use the ID you set
  }

  stages {
    // REMOVED: stage('Checkout') block
    // Jenkins automatically checks out the repo containing the Jenkinsfile at the start.

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