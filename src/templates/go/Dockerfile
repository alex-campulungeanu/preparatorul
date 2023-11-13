FROM golang:bullseye

ARG http_proxy
ARG https_proxy

ENV http_proxy ${http_proxy}
ENV https_proxy ${https_proxy}
ENV GOINSECURE=*
ENV GONOSUMDB=*
ENV GOPRIVATE=*

RUN apt-get update
RUN apt install -y openssl
RUN git config --global http.sslverify false
