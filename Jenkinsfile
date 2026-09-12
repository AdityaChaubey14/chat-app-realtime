pipeline {
    agent any
    
    environment {
        NODE_ENV = 'development'
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔄 Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Backend - Install Dependencies') {
            steps {
                echo '📦 Installing backend dependencies...'
                dir() {
                    sh 'npm install'
                }
            }
        }
        
        stage('Backend - Lint') {
            steps {
                echo '🔍 Running ESLint on backend...'
                dir() {
                    sh 'npm run lint || true'
                }
            }
        }
        
        stage('Backend - Format Check') {
            steps {
                echo '✨ Checking code formatting...'
                dir() {
                    sh 'npm run format:check || true'
                }
            }
        }
        
        stage('Frontend - Install Dependencies') {
            steps {
                echo '📦 Installing frontend dependencies...'
                dir() {
                    sh 'npm install'
                }
            }
        }
        
        stage('Frontend - Lint') {
            steps {
                echo '🔍 Running ESLint on frontend...'
                dir() {
                    sh 'npm run lint || true'
                }
            }
        }
        
        stage('Frontend - Build') {
            steps {
                echo '🔨 Building frontend...'
                dir() {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Backend - Build Docker Image') {
            steps {
                echo '🐳 Building backend Docker image...'
                sh '''
                    docker build                         -f docker/Dockerfile.backend                         -t chat-app-backend:                         -t chat-app-backend:latest .
                '''
            }
        }
        
        stage('Frontend - Build Docker Image') {
            steps {
                echo '🐳 Building frontend Docker image...'
                sh '''
                    docker build                         -f docker/Dockerfile.frontend                         -t chat-app-frontend:                         -t chat-app-frontend:latest .
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            // You can add notifications here (email, Slack, etc.)
        }
        failure {
            echo '❌ Pipeline failed!'
            // You can add failure notifications here
        }
        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
    }
}
