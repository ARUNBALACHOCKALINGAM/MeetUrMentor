pipeline {
    agent any
    tools {
        nodejs 'NodeJS18'
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Update Browserslist DB') {
            steps {
                sh 'npx update-browserslist-db@latest'
            }
        }
        stage('Lint Code') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
