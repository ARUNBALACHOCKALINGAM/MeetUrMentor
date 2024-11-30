pipeline {
    agent any

    environment {
        NODE_VERSION = '20.18.0' // Ensure this matches the required Node.js version
    }

    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    // Use Node.js plugin or manually install Node.js
                    echo 'Setting up Node.js environment'
                }
            }
        }

        stage('Checkout Code') {
            steps {
                // Check out the code from the version control system
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install project dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Lint Code') {
            steps {
                script {
                    // Run linting script
                    sh 'npm run lint'
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    // Build the application
                    sh 'npm run build'
                }
            }
        }

        stage('Run Preview') {
            steps {
                script {
                    // Optionally run a preview to ensure the build is successful
                    sh 'npm run preview'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace'
            cleanWs()
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed. Please check the logs.'
        }
    }
}
