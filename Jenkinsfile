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
        bat '''
        docker stop my_app_container || echo "no container to stop"
        docker rm my_app_container || echo "no container to remove"
        docker run -d -p 3000:80 --name my_app_container my_app
        '''
    }
}
// <--- C'est ICI que le bloc 'stages' doit se terminer.

    // LA SECTION 'POST' DOIT VENIR ICI, AU MÊME NIVEAU QUE 'stages'.
    post {
    success {
        echo "Pipeline SUCCESS ✅"
    }
    failure {
        echo "Pipeline FAILED ❌"
    }
}

} // <--- C'est ICI que le bloc 'pipeline' se termine.
