pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run tests') {
            steps {
                bat 'npx playwright test --project=chromium --grep-invert "Intentional failure demo"'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true 
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}