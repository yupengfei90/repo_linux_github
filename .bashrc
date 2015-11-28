# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias vi='vim'

# add 20141227
alias grep='grep --color=auto'
alias egrep='egrep --color=auto'
export PS1=\[\e[32m\][\u@\h \w]\$ \[\e[0m\]

# add 20150323
alias ld='ld -m elf_i386'	
alias as='as --32'

# add at 20150422
alias ld-dlinker='ld -dynamic-linker /lib/ld-linux.so.2'


# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi
