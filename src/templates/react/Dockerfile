FROM node:12

ARG http_proxy
ARG https_proxy

ENV http_proxy ${http_proxy}
ENV https_proxy ${https_proxy}


RUN apt-get update
RUN apt install -y vim
RUN \
    echo 'alias ls="ls --color=auto"' >> /root/.bashrc && \
    echo 'PS1="\[\033[1;33m\][\u@\h \W >>>] \$ \[\033[0m\]"' >> /root/.bashrc
#fix vim on Debian
RUN echo 'if filereadable("/usr/share/vim/vim80/defaults.vim") \n \
source /usr/share/vim/vim80/defaults.vim \n \
endif \n \
" now set the line that the defaults file is not reloaded afterwards! \n \
let g:skip_defaults_vim = 1 \n \
" turn of mouse \n \
set mouse= \n \
" other override settings go here ' >> /etc/vim/vimrc.local

WORKDIR /app

COPY package.json ./

RUN npm install --silent

CMD ["tail", "-f", "/dev/null"]