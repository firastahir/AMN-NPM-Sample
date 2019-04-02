node {

   properties([

    [$class: 'BuildDiscarderProperty',

      strategy: [$class: 'LogRotator',

        artifactDaysToKeepStr: '5',

        artifactNumToKeepStr: '5',

        daysToKeepStr: '5',

        numToKeepStr: '5']
    ]

   ])
   podTemplate(){
    node('centos') {
        container('centos') {

  jdk = tool name: 'JDK-Tool'
  env.JAVA_HOME = "${jdk}"
  sh "${jdk}/bin/java -version"
   def NODEJS_HOME
 
   stage('Prepare') {
    //nodeHome = tool 'Node-11.8.0'
      env.NODEJS_HOME = "${tool 'Node-11.8.0'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    //echo "${env.PATH}"
    //sh "ls -las '${env.NODEJS_HOME}'"
    //sh "ls -las '${env.NODEJS_HOME}'/bin"
    //sh "ldd '${env.NODEJS_HOME}'/bin/node "
      sh "'${env.NODEJS_HOME}'/bin/node --version"
   }
   
   stage('Checkout') {
      checkout scm
      sh "curl -O https://confluence.atlassian.com/kb/files/779355358/779355357/1/1441897666313/SSLPoke.class"
	sh "cd $JAVA_HOME/jre/lib/security && chmod +x cacerts"
sh "${jdk}/bin/keytool -noprompt -storepass changeit -trustcacerts -importcert -alias amerensubca -file ./amerensubca.crt -keystore $JAVA_HOME/jre/lib/security/cacerts"
sh "${jdk}/bin/keytool -noprompt -storepass changeit -trustcacerts -importcert -alias amerenroot -file ./amerenroot.crt -keystore $JAVA_HOME/jre/lib/security/cacerts"
sh "${jdk}/bin/keytool -noprompt -storepass changeit -trustcacerts -importcert -alias SH2v3Intermediate -file ./SH2v3Intermediate.cer -keystore $JAVA_HOME/jre/lib/security/cacerts"

sh "${jdk}/bin/keytool -noprompt -storepass changeit -trustcacerts -importcert -alias SH2v3Root -file ./SH2v3Root.cer -keystore $JAVA_HOME/jre/lib/security/cacerts"
sh "${jdk}/bin/java SSLPoke artifactory.ameren.com 443"
   }
   stage('NPM Set Up') {
   withNPM(npmrcConfig:'0bd01885-433e-4bb7-a26d-6f0c196ec5a6') {
	// sh "npm config ls -l"
	// sh "cat /home/jenkins/.npmrc"
	sh "cp ./.npmrc MobileFirst.Sample"
	sh "cd MobileFirst.Sample && cat .npmrc"
	
    }
    }
   stage('Install dependencies') {
  
   
        sh "cd MobileFirst.Sample && npm install --unsafe-perm"
        sh "cd MobileFirst.Sample && npm install -g gulp"
        sh "cd MobileFirst.Sample && npm install --unsafe-perm gulp-sass"
        sh "cd MobileFirst.Sample && npm install -g @angular/cli"
      //sh "cd MobileFirst.Sample && ls -lR"
        sh "cd MobileFirst.Sample && gulp sass"
        
    }
    
    
   stage('Build project') {
        sh "cd MobileFirst.Sample && ng build my-app && cd dist && ls -lR"
	
	sh "cd MobileFirst.Sample && npm publish"
    }   

}
}
}
}
