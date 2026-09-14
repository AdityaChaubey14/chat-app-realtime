pipeline {
    agent any
    
    environment {
        NODE_ENV = 'development'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔄 Checking out code...'
                checkout scm
            }
        }
        
        stage('Backend Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-v $WORKSPACE:/app -w /app/backend'
                }
            }
            steps {
                echo '📦 Installing backend dependencies...'
                sh 'npm install'
                echo '✅ Backend ready!'
            }
        }
        
        stage('Frontend Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-v $WORKSPACE:/app -w /app/frontend'
                }
            }
            steps {
                echo '📦 Installing frontend dependencies...'
                sh 'npm install'
                echo '🔨 Building frontend...'
                sh 'npm run build'
                echo '✅ Frontend built!'
            }
        }
        
        stage('Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                sh 'docker build -f docker/Dockerfile.backend -t chat-app-backend:${BUILD_NUMBER} .'
                sh 'docker build -f docker/Dockerfile.frontend -t chat-app-frontend:${BUILD_NUMBER} .'
                echo '✅ Docker images ready!'
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline SUCCESS! Images built and ready to deploy.'
        }
        failure {
            echo '❌ Pipeline FAILED!'
        }
    }
}
