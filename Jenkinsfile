pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'web', 'api', 'csv'],
            description: 'Який набір тестів запускати'
        )
        booleanParam(
            name: 'RUN_FAILING_DEMO',
            defaultValue: false,
            description: 'Запускати навмисно падаючі тести (для демо помилок)'
        )
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
                script {
                    def grepInvert = params.RUN_FAILING_DEMO ? '' : '--grep-invert "Intentional failure demo"'
                    def suite = ""

                    if (params.TEST_SUITE == 'web') {
                        suite = 'tests/web'
                    } else if (params.TEST_SUITE == 'api') {
                        suite = 'tests/api'
                    } else if (params.TEST_SUITE == 'csv') {
                        suite = 'tests/csv'
                    } else {
                        suite = ''
                    }

                    bat "npx playwright test ${suite} --project=chromium ${grepInvert}"
                }
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