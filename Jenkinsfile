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
                // Vérification de la version de Node sur l'agent Jenkins (pour info)
                bat 'node -v' 
                bat 'npm install'
            }
        }
        
        stage('Build React App') {
            environment {
                CI = "false" // Pour éviter que Create React App traite les avertissements comme erreurs
            }
            steps {
                bat 'npm run build'

                // ⚡ Archiver le build React comme artefact
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
        
        stage('Docker Build') {
            steps {
                // Construit l'image Docker et la tagge 'my_app'
                bat 'docker build -t my_app .'
            }
        }
        
        stage('Run Docker Container') {
            steps {
                // Arrêter et supprimer l'ancien conteneur si nécessaire
                bat 'docker stop my_app_container || echo "no container to stop"'
                bat 'docker rm my_app_container || echo "no container to remove"'

                // Démarrer le nouveau conteneur
                bat 'docker run -d -p 3000:80 --name my_app_container my_app' 
            }
        }
    } // Fin des stages

    post {
        always {
            bat 'echo "Pipeline Finished"'
        }
        failure {
            bat 'echo "Pipeline Failed!"'
        }
    }
}
