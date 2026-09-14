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
        
        stage('Backend - Install') {
            steps {
                echo '📦 Installing backend dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Backend - Lint') {
            steps {
                echo '🔍 Linting backend...'
                dir('backend') {
                    sh 'npm run lint || true'
                }
            }
        }
        
        stage('Frontend - Install') {
            steps {
                echo '📦 Installing frontend dependencies...'
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Frontend - Build') {
            steps {
                echo '🔨 Building frontend...'
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                echo '🐳 Building Docker images...'
                sh 'docker build -f docker/Dockerfile.backend -t chat-app-backend:${BUILD_NUMBER} -t chat-app-backend:latest .'
                sh 'docker build -f docker/Dockerfile.frontend -t chat-app-frontend:${BUILD_NUMBER} -t chat-app-frontend:latest .'
                echo '✅ Images ready!'
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline SUCCESS!'
        }
        failure {
            echo '❌ Pipeline FAILED!'
        }
    }
}
