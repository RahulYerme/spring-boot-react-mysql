def ver
def ver1

pipeline{
  environment {
    registry = "rahulyerme1234/react-java-app"
    registry1 = "rahulyerme1234/react-java-app-backend"
    registryCredential = 'dockerhub'
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
   /* stage('Building frontend image') {
     steps{
	dir('/var/lib/jenkins/workspace/React-Java-app-pipeline/react-client'){
      script {    
        ver = docker.build registry + ":$BUILD_NUMBER"
    }
  }
 }
    }
   stage('Building backend image') {
     steps{
	dir('/var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server'){
      script {    
        ver1 = docker.build registry1 + ":$BUILD_NUMBER"
    }
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
   stage('push backend docker image') {
      steps {
		script {
			withDockerRegistry(credentialsId: 'dockerhub') {
			  ver1.push("${env.BUILD_NUMBER}")
			 ver1.push("latest")
			}
		  }
        
      }
    }*/
   stage("Nexus Repository Upload" ){
      steps{
        script{
         nexusArtifactUploader artifacts: [[artifactId: 'spring-boot-starter-parent', classifier: '', 
                                            file: '/var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server/target/spring-boot-data-jpa-0.0.1-SNAPSHOT.jar',
                                            type: 'jar']], 
                                            credentialsId: 'newnexus', 
                                            groupId: 'org.springframework.boot', 
                                            nexusUrl: '72.28.77.142:8085', 
                                            nexusVersion: 'nexus3', 
                                            protocol: 'http', 
                                            repository: 'backend',
                                            version: '3.1.0-SNAPSHOT'
        }
      }
    }
  }
    
}
