node() {
    try {
        stage('checkout') {
            checkout scm
        }
        stage('package') {
            sh 'npm update'
        }
        stage('build') {
            sh 'ng build'
        }
        stage('lint') {
            sh 'ng lint'
        }
        stage('analysis') {
            echo '**** TODO'
        }
        stage('unit/integration-test') {
            sh 'ng test --reporters junit'
        }
        stage('deploy') {
            echo '*******TODO'
        }
        stage('finish-up') {
            echo 'done'
            slackSend channel: '#team-reason', color: 'good', message: "*${env.JOB_NAME}* Passed", teamDomain: 'barclaysafricacto', token: '4UpG4kD7ixj9FhSnbNvbZh6a'
        }
    } catch (error) {

        slackSend channel: '#team-reason', color: 'danger', message: "Fix the build *${env.JOB_NAME}* before *ze Germans* get here...", teamDomain: 'barclaysafricacto', token: '4UpG4kD7ixj9FhSnbNvbZh6a'
        echo 'build failed with ${error}'
        throw error
    } finally {
        if (fileExists('test-results/karma-tests-junit.xml')) {
              junit 'test-results/karma-tests-junit.xml'
        }
    }

}
