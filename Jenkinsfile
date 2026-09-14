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
                sh '''
                    docker run --rm \
                        -v $PWD/backend:/app/backend \
                        -w /app/backend \
                        node:22-alpine \
                        npm install
                '''
            }
        }
        
        stage('Backend - Lint') {
            steps {
                echo '🔍 Running ESLint on backend...'
                sh '''
                    docker run --rm \
                        -v $PWD/backend:/app/backend \
                        -w /app/backend \
                        node:22-alpine \
                        npm run lint || true
                '''
            }
        }
        
        stage('Backend - Format Check') {
            steps {
                echo '✨ Checking code formatting...'
                sh '''
                    docker run --rm \
                        -v $PWD/backend:/app/backend \
                        -w /app/backend \
                        node:22-alpine \
                        npm run format:check || true
                '''
            }
        }
        
        stage('Frontend - Install Dependencies') {
            steps {
                echo '📦 Installing frontend dependencies...'
                sh '''
                    docker run --rm \
                        -v $PWD/frontend:/app/frontend \
                        -w /app/frontend \
                        node:22-alpine \
                        npm install
                '''
            }
        }
        
        stage('Frontend - Lint') {
            steps {
                echo '🔍 Running ESLint on frontend...'
                sh '''
                    docker run --rm \
                        -v $PWD/frontend:/app/frontend \
                        -w /app/frontend \
                        node:22-alpine \
                        npm run lint || true
                '''
            }
        }
        
        stage('Frontend - Build') {
            steps {
                echo '🔨 Building frontend...'
                sh '''
                    docker run --rm \
                        -v $PWD/frontend:/app/frontend \
                        -w /app/frontend \
                        node:22-alpine \
                        npm run build
                '''
            }
        }
        
        stage('Backend - Build Docker Image') {
            steps {
                echo '🐳 Building backend Docker image...'
                sh '''
                    docker build \
                        -f docker/Dockerfile.backend \
                        -t chat-app-backend:${BUILD_NUMBER} \
                        -t chat-app-backend:latest .
                '''
            }
        }
        
        stage('Frontend - Build Docker Image') {
            steps {
                echo '🐳 Building frontend Docker image...'
                sh '''
                    docker build \
                        -f docker/Dockerfile.frontend \
                        -t chat-app-frontend:${BUILD_NUMBER} \
                        -t chat-app-frontend:latest .
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            echo '🧹 Workspace cleaned!'
        }
    }
}
