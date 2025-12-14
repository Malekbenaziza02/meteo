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
                // CI="false" est souvent nécessaire pour éviter que des outils comme Create React App 
                // ne traitent les avertissements comme des erreurs en mode CI.
                CI = "false" 
            }
            steps {
                bat 'npm run build'
            }
        }
        
        stage('Docker Build') {
            steps {
                // Construit l'image et la tagge comme 'my_app'
                bat 'docker build -t my_app .'
            }
        }
        
        stage('Run Docker Container') {
            steps {
                // Arrête le conteneur précédent s'il existe
                bat 'docker stop my_app_container || echo "no container to stop"'
                // Supprime le conteneur arrêté
                bat 'docker rm my_app_container || echo "no container to remove"'
                // DÉMARRE LE NOUVEAU CONTENEUR (Correction)
                // -d : mode détaché (en arrière-plan)
                // -p 3000:80 : mappe le port 3000 de la machine hôte au port 80 du conteneur (Nginx)
                // --name : nomme le conteneur
                bat 'docker run -d -p 3000:80 --name my_app_container my_app'
            }
        }
    }

    post {
        always {
            bat 'echo "Pipeline Finished"'
        }
        failure {
            // Optionnel : ajouter des notifications en cas d'échec
            bat 'echo "Pipeline Failed!"'
        }
    }
}