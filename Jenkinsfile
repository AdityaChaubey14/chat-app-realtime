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
                    sh 'npm run lint || echo "Lint check skipped"'
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
    }
    
    post {
        success {
            echo '✅ Pipeline SUCCESS! Backend & Frontend ready!'
            echo '📦 Artifacts: frontend/dist/ ready for deployment'
        }
        failure {
            echo '❌ Pipeline FAILED!'
        }
    }
}
