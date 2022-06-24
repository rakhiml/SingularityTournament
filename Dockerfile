FROM ubuntu:18.04
RUN apt-get -y update
RUN apt-get -y install default-jre
RUN apt-get -y install default-jdk
RUN apt-get -y install git
RUN apt-get -y install maven
RUN export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

RUN git clone https://github.com/nariman589/SingularityTournament

WORKDIR /backend

ARG JAR_FILE=*.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java", "-jar", "application.jar"]


