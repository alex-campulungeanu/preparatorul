FROM golang:1.21.4-bullseye

ARG http_proxy
ARG https_proxy

ENV http_proxy ${http_proxy}
ENV https_proxy ${https_proxy}
ENV GOINSECURE=*
ENV GONOSUMDB=*
ENV GOPRIVATE=*

RUN apt-get update
RUN apt install -y openssl vim
RUN git config --global http.sslverify false
RUN git config --global http.postBuffer 524288000
        # Or set double value  1048576000
RUN git config --global https.postBuffer 
RUN git config --global core.compression -1 