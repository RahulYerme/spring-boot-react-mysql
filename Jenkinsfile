def ver

pipeline{
  environment {
    registry = "rahulyerme1234/react-java-app"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  
   
  agent any
  
  tools {
    
       maven 'apache-maven-3.9.3' 
       }
	stages{
    
     stage('Build backend'){
       steps{
         script{
           sh 'cd /spring-boot-server'
           sh 'mvn clean install'
         }
       }
         
    }
    stage('Build frontend'){
       steps{
         script{
           sh 'cd /react-client'
           sh 'npm install'
         }
       }
         
    }
      stage("Junit Publish Test"){
      steps{
        script{
          junit allowEmptyResults: true, skipPublishingChecks: true, testDataPublishers: [[$class: 'AttachmentPublisher']],
               testResults: '**/target/surefire-reports/TEST-*.xml'
        }
      }
    }
    stage('Local artifact archive') {
      steps {
        script{
        archiveArtifacts artifacts: 'target/*.jar', followSymlinks: false
        archiveArtifacts artifacts: 'target/*.jar', followSymlinks: false
      }
    }
    }
   /* stage('Building our image') {
     steps{
      script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
    }
  }
 }
    stage('push docker image') {
      steps {
		script {
			withDockerRegistry(credentialsId: 'dockerhub') {
			  dockerImage.push("${env.BUILD_NUMBER}")
			 dockerImage.push("latest")
			}
		  }
        
      }
    }*/
  }
    
}
