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
