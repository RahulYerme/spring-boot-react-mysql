def ver

pipeline{
  environment {
    registry = "rahulyerme1234/react-java-app"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  
   
  agent any
  
   tools { 
        maven 'ApacheMaven3.9.3' 
        
    }
	stages{
    
     stage('Build backend'){
       steps{
         script{
           /*sh 'cd spring-boot-server'
	   sh 'ls'
           sh 'mvn clean install'*/
          sh '''#! /bin/bash
                       cd /var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server
                       mvn clean install
		       cd /var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server
	               ls
		       chown -R jenkins:jenkins target
                       '''
         }
       }
         
    }
    stage('Build frontend'){
       steps{
         script{
           sh '''#! /bin/bash
                       cd /var/lib/jenkins/workspace/React-Java-app-pipeline/react-client
                       npm install
                       '''
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
        archiveArtifacts artifacts: 'spring-boot-server/target/*.jar', followSymlinks: false
       /* archiveArtifacts artifacts: 'target/*.jar', followSymlinks: false */
      }
    }
    }
    stage('Building our image') {
     steps{
      script {
	      
        ver = docker.build registry + ":$BUILD_NUMBER"
    }
  }
 }
    stage('push docker image') {
      steps {
		script {
			withDockerRegistry(credentialsId: 'dockerhub') {
			  ver.push("${env.BUILD_NUMBER}")
			 ver.push("latest")
			}
		  }
        
      }
    }
  }
    
}
