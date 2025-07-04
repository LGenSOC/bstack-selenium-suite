pipeline {
    agent any

    environment {
        BROWSERSTACK_USERNAME = credentials('inesbrown_gMa9mb')  // Jenkins Credentials ID
        BROWSERSTACK_ACCESS_KEY = credentials('LJEAxKYyRkApfUgXsq4j')  // Jenkins Credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your Git repo (replace with your repo URL if needed)
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh '''
                    echo "Running BrowserStack Selenium tests..."

                    export BROWSERSTACK_USERNAME=${BROWSERSTACK_USERNAME}
                    export BROWSERSTACK_ACCESS_KEY=${BROWSERSTACK_ACCESS_KEY}

                    npm test
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
