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
        /*archiveArtifacts artifacts: '/var/lib/jenkins/workspace/React-Java-app-pipeline/. *', followSymlinks: false */
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
   stage('snyk scan') {
      steps {
		script {
			snykSecurity (
				organisation: 'rahulyerme67', 
				snykInstallation: 'Snykdocker',
				snykTokenId: 'e6f1ba75-da14-47db-9368-a74bcaded961',
				
				failOnIssues: 'false',
				targetFile: '/var/lib/jenkins/workspace/React-Java-app-pipeline/react-client/package.json'
			)
			}
		  }
        
      }
	
    
   stage("Nexus Repository Upload" ){
      steps{
        script{
         nexusArtifactUploader artifacts: [[artifactId: 'spring-boot-data-jpa', classifier: '',
					    file: '/var/lib/jenkins/workspace/React-Java-app-pipeline/spring-boot-server/target/spring-boot-data-jpa-1.0.1-SNAPSHOT.jar',
					    type: 'Jar']], 
		                            credentialsId: 'newnexus', 
		                            groupId: 'com.bezkoder', 
		                            nexusUrl: '172.31.229.127:8085', 
		                            nexusVersion: 'nexus3', 
		                            protocol: 'http', 
		                            repository: 'backend', 
		                            version: '1.0.1-SNAPSHOT'
        }
      }
    }
  }
    
}
