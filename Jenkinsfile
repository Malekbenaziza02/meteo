pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node Dependencies') {
            steps {
                bat 'node -v'
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t meteo_image .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat '''
                docker stop meteo_container || echo "no container to stop"
                docker rm meteo_container || echo "no container to remove"
                docker run -d -p 3000:80 --name meteo_container meteo_image
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline SUCCESS ✅'
        }
        failure {
            echo 'Pipeline FAILED ❌'
        }
    }
}
