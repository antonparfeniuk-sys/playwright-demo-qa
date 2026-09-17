pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'   // назва має збігатися з тією, яку налаштуєш у Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npx playwright test --project=chromium --grep-invert "Intentional failure demo"'
            }
        }
    }

    post {
        always {
            // Архівуємо HTML-звіт
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            // Можна також зберігати test-results
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
        failure {
            echo 'Tests failed!'
        }
        success {
            echo 'All tests passed!'
        }
    }
}