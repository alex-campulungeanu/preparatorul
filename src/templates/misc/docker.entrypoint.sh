#!/bin/bash

echo 'Start cooking script'

DUMMY_FILE=/root/initialized
if [ ! -f "$DUMMY_FILE" ]; then
  echo 'Dummy file is not present, start cooking container'
  touch $DUMMY_FILE
  apt-get update
  apt install -y vim tmux locales-all
  echo 'alias ls="ls --color=auto"' >> /root/.bashrc && \
  # echo 'PS1="\[\033[1;33m\][\u@\h \W >>>] \$ \[\033[0m\]"' >> /root/.bashrc
  echo 'function parse_git_branch () {
          git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
        }
        RED="\[\033[01;31m\]"
        YELLOW="\[\033[01;33m\]"
        GREEN="\[\033[01;32m\]"
        BLUE="\[\033[01;34m\]"
        NO_COLOR="\[\033[00m\]"
        # without host
        #PS1="$GREEN\u$NO_COLOR:$BLUE\w$YELLOW\$(parse_git_branch)$NO_COLOR\$ "
        PS1="\u@\h \[\e[32m\]\w \[\e[91m\]\$(parse_git_branch)\[\e[00m\]$ "' >> /root/.bashrc



  ##fix vim on Debian

  echo 'if filereadable("/usr/share/vim/vim81/defaults.vim")
  source /usr/share/vim/vim81/defaults.vim
  endif
  " now set the line that the defaults file is not reloaded afterwards!
  let g:skip_defaults_vim = 1
  " turn of mouse
  set mouse=
  " other override settings go here ' >> /etc/vim/vimrc.local
else 
    echo "$DUMMY_FILE exist."
fi

# tail -f /dev/null