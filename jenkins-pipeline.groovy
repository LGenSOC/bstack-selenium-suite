pipeline {
    agent any

    environment {
        BROWSERSTACK_USERNAME = credentials('inesbrown_gMa9mb') // Jenkins Credential ID
        BROWSERSTACK_ACCESS_KEY = credentials('LJEAxKYyRkApfUgXsq4j') // Jenkins Credential ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone your repo
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install node modules (adjust if you use yarn or npm)
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run your Selenium test script
                sh 'node tests/test-favorite-samsung.js'
            }
        }
    }

    post {
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
