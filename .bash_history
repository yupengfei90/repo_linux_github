perl -ne 'print if /(?i) the/' rime.txt 
git status
sed -En 's/(It is) (an ancyent Marinere)/\2 \1/' rime.txt 
sed -En 's/(It is) (an ancyent Marinere)/\2 \1/p' rime.txt 
man sed
sed -E 's/(It is) (an ancyent Marinere)/\2 \1/p' rime.txt 
sed -E 's/(It is) (an ancyent Marinere)/\2 \1/q' rime.txt 
sed -E 's/(It is) (an ancyent Marinere)/\2 \1/;q' rime.txt 
sed -En 's/(It is) (an ancyent Marinere)/\2 \1/p' rime.txt 
perl -ne 'print if s/(It is) (an ancyent Marinere)/$2 $1' rime.txt
perl -ne 'print if s/(It is) (an ancyent Marinere)/$2 $1/' rime.txt
perl -e 'print if s/(It is) (an ancyent Marinere)/$2 $1/' rime.txt
perl -ne 'print if s/(It is) (an ancyent Marinere)/$2 $1/' rime.txt
perl -ne 'print if s/(It is) (an ancyent Marinere)/u$2 u$1/' rime.txt 
perl -ne 'print if s/(It is) (an ancyent Marinere)/\u$2 \l$1/' rime.txt 
perl -ne 'print if s/(It is) (an ancyent Marinere)/\E$2 \l$1/' rime.txt 
perl -ne 'print if s/(?<one>It is) (?<two>an ancyent Marinere)/\u$+{two} \l$+{one}/' rime.txt
cat ascii-graphic.txt 
cat voltaire.txt 
etc.sh Silverlight
etc.sh Silver
bc
vi basho.txt 
cat schiller.txt 
vi ascii.txt 
cat -a ascii.txt 
cat -A ascii.txt 
perl -ne 'print if /\c@/' ascii.txt 
vi ascii.txt 
gedit rime.txt 
perl -ne 'print if /(?i)ancyent (?=marinere)/' rime.txt 
perl -ne 'print if /(?i)ancyent (?=ma)/' rime.txt 
perl -ne 'print if /(?i) (?<=ancyent) marinere/' rime.txt
ls
grep -Eo '<[_a-zA-Z]*>' lorem.dita 
sed '1i \'
sed '1i \
<!DOCTYPE html>\
<html lang="en">
sed '1i \
<!DOCTYPE html>
sed '1i\
<DOCTYPE html>\
<html en="en">\
<head>\
<title>The Rime of the Ancyent Marinere (1798)</title>\
<meta charset="utf-8"/>\
</head>\
<body>\
q' rime.txt
head rime.txt 
sed '1 i\
<DOCTYPE html>\
<html en="en">\
<head>\
<title>The Rime of the Ancyent Marinere (1798)</title>\
<meta charset="utf-8"/>\
</head>\
<body>\
q' rime.txt
sed '1 i\
<DOCTYPE html>\
<html en="en">\
<head>\
<title>The Rime of the Ancyent Marinere (1798)</title>\
<meta charset="utf-8"/>\
</head>\
<body>\
q' rime.txt | less
sed '1 i\
<DOCTYPE html>\
<html en="en">\
<head>\
<title>The Rime of the Ancyent Marinere (1798)</title>\
<meta charset="utf-8"/>\
</head>\
<body>\
' rime.txt | less
sed '1s/^\(.*\)$/<title>\1<\title>/;q' rime.txt
sed '1s/^\(.*\)$/<title>\1</title>/;q' rime.txt
sed '1s/^\(.*\)$/<title>\1<\/title>/;q' rime.txt
sed '1s/^\(.*\)$/<title>\1<\/title>/' rime.txt
sed '1s/^\(.*\)$/<title>\1<\/title>/' rime.txt | less
sed '2s/^\(.*\)$/<title>\1<\/title>/;q' rime.txt | less
sed '2s/^\(.*\)$/<title>\1<\/title>/;q' rime.txt 
sed '2s/^\(.*\)$/<title>\1<\/title>/' rime.txt | less
sed '3s/^\(.*\)$/<title>\1<\/title>/' rime.txt | less
sed '3s/^\(.*\)$/<title>\1<\/title>/;q' rime.txt | less
head rime.txt 
man sed
sed -n '3s/^\(.*\)$/<title>\1<\/title>/p' rime.txt | less
head rime.txt 
vi rime.txt
etc.sh rime
vi rime.txt
sed -En 's/^(ARGUMENT\.|I{0,3}V?I{0,2}\.)$/<h2>\1<\/h2>/p' rime.txt
sed -En 's/(ARGUMENT\.|I{0,3}V?I{0,2}\.)/<h2>\1<\/h2>/p' rime.txt
sed -En 's/^(ARGUMENT\.|I{0,3}V?I{0,2}\.)$/<h2>\1<\/h2>/p' rime.txt
sed -En '5s/^([A-Z].*)/<p>\1<\/p>/p' rime.txt 
sed '9p' rime.txt 
sed -n '9p' rime.txt 
sed -En '833s/^(.*)/'
sed -En '833s/^(.*)/\1<\/p>/p' rime.txt 
sed -En '833s/(.*)/\1<\/p>/p' rime.txt 
grep [a-z] rime.txt 
grep '[A-Z]' rime.txt
init 0
cd /root/山羊/
ls
vi 九亩玉米耗资 
vi 羊场工作日记 
vi 鸡鸭成本
vi 羊场工作日记 
vi 九亩玉米耗资 
vi 鸡鸭成本
vi 羊场工作日记 
vi 鸡鸭成本
vi 九亩玉米耗资 
init 0
echo () > test
echo '()' > test
grep ( test
grep '(' test
yum update -y 
echo the The THE > test
echo -E 'the\nThe'
man echo
echo -e 'the\nThe\nTHE'> test
grep the test
grep (?i:the) test
grep '(?i:the)' test
cat test
man at
at now+4hours
       -E     disable interpretation of backslash escapes (default)
python
python2.6 
init 0
passwd
cd /root/Download/
file progit-en.831.epub 
file progit-en.831.zip 
unzip progit-en.831.zip 
cd progit-en.831.zip 
ls
cd book
ls
firefox 1-introduction.html
firefox ./1-introduction.html
cd ..
firefox ./1-introduction.html
man unzip
etc.sh encounter
etc.sh collaborate
etc.sh identical
etc.sh bless
etc.sh Integrity
corruption
etc.sh corruption
yum install 'Foxit Reader'
yum search all "Foxit Reader"
yum search all FoxitReader
etc.sh hash
etc.sh staging
git version
yum update git
ls
tar -zxv -f git-2.5.3.tar.gz 
cd git-2.5.3
ls
make
make clean
make install
yum install git
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
make configure
./configure --prefix=/usr
make install
cd /usr
ls
history 10
git version
git --version
man git
ls
cd bin
ls
ls | grep git
cd ../share/
ls
init 0
ip add show ppp0
6666666666666666666666666666666677777QAAAAAAAAAAAAAAAAAAAAAATYYYYYYYY
]'~5~6
init 0
cd 山羊
ls
git status
cd finance/
ls
libreoffice calc-example.ods &
cd ..
ls
vi 鸡鸭成本
cd finance/
cd -
vi 九亩玉米耗资
init 0
git config --global user.name "Yu Pengfei"
git config --global user.email "yupengfei90@163.com"
git config --list
git config user.name
git help config
git version
sensors
etc.sh diverged
etc.sh comprehensive,
etc.sh negate
etc.sh asterisk
addnew.sh 
sensors
ls -d ./*
cd git
ls
git status
ls
pwd
git difftool --tool
git difftool --tool -help
etc.sh expansion
 git clone https://github.com/schacon/simplegit-progit
cd simplegit-progit/
git status
git log
git log -p -2
etc.sh abbreviated
git log --state
git log --stat
git log -p
etc.sh pretty
senors
sensors
git log
git log --pretty=oneline
git log --pretty=full
git log --pretty=format:"%h - %an, %ar : %s"
sensors
init 0
cd git
ls
cd simplegit-progit/
git log --prettty=format:"%h - %an, %ar : %s"
git log --pretty=format:"%h - %an, %ar : %s"
git log --pretty=format:"%h %s" --graph
etc.sh formate
etc.sh format
sensors
git log -p
git log --stat 
git lo
git log
git log --shortstat
git log --name-only
git log --name-status
git log --abbrev-commit
git log --relative-date
git log --since=2.weeks
git log --since=9.years
git log --until=now
etc.sh dash
history 10
git log --name-only
git log -SRakefile
git log -S Rakefile
etc.sh criteria.
git log -p -2
git log -S version
git log -Sversion
etc.sh introduced
etc.sh refenrence
git log -p -1
git log --Rakefile
git log -S Rakefile
git log -S version
etc.sh amend
demonstrate
etc.sh demonstrate
etc.sh wrangle
etc.sh stash
etc.sh collaborate
sensors
git remote
cd ..
git clone https://github.com/schacon/ticgit
cd ticgit/
ls
git remote -v
etc.sh fetch
git remote add pb https://github.com/paulboone/ticgit
ls
git remote -v
etc.sh lieh
etc.sh paul
git fetch pb
git branch
git branch --list
etc.sh inspect
addnew.sh 
etc.sh meantime.
etc.sh incorporate
git remote show origin
etc.sh encounter.
git remote show origin
git remote
git remote rename pb paul
git remote
git remote rm paul
git remote
git tag
git tag -l 'v1.8.5'
etc.sh annotated.
git tag -a v1.4 -m 'my version 1.4'
git tag
git show v1.4
git tag v1.5-lw
git show v1.5
git show v1.5-lw
etc.sh threads.
git log
git log -1
git log -1 HEAD
etc.sh demonstrate
sensors
init 0
etc.sh blobs
cd /root/山羊
vi 羊场工作日记 
cd /root
cd git
sensors
etc.sh object
etc.sh checksums
ls
cd ticgit/
ls
etc.sh decorate
git log --oneline --decorate
etc.sh checkout
etc.sh deploy
etc.sh phrase
etc.sh divergent
etc.sh deploy
etc.sh integrate
etc.sh diverge
etc.sh conclude
etc.sh embraces
etc.sh silos,
etc.sh proposed
etc.sh topic
etc.sh dumbidea
etc.sh demonstrate
etc.sh delta
etc.sh credential
etc.sh shorthand
etc.sh  rewind
etc.sh maintainer
etc.sh rebase
etc.sh Perils
etc.sh pickle.
sensors
init  0
sensors
etc.sh angle
etc.sh blasphemous;
etc.sh messy
etc.sh posterity.
etc.sh deserves
etc.sh camp
etc.sh courage
etc.sh discourage
etc.sh fairly
etc.sh straightforward.
etc.sh instances
cd git
etc.sh reside
etc.sh  cata-
strophic 
etc.sh  cata-strophic
etc.sh extraneous
etc.sh pros
etc.sh cons
etc.sh prior
etc.sh negotiate
etc.sh manner
etc.sh dumb
etc.sh anonymously
vi /usr/bin/etc.sh 
etc.sh anonymously
vi /usr/bin/etc.sh 
etc.sh anonymously
vi /usr/bin/etc.sh 
etc.sh anonymously
vi /usr/bin/etc.sh 
etc.sh anonymously
vi /usr/bin/etc.sh 
etc.sh anonymously
vi /usr/bin/etc.sh 
which readnew.sh
vi /usr/local/bin/readnew.sh
which addnew
which addnew.sh
vi /usr/local/bin/addnew.sh
vi /usr/bin/etcq
vi /usr/bin/etc.sh 
etc.sh 
sensors
cd /tmp
vi test.sh
chmod +x test.sh 
./test.sh hello
vi test.sh
./test.sh fine
./test.sh 
etc.sh 
vi /usr/bin/etc.sh 
etc.sh 
vi /usr/bin/etc.sh 
etc.sh 
init 0
cd git
sensors
init 0
etc.sh 
vi /etc/hosts
ping server
ssh root@server
cd git
ls
git clone --bare ticgit ticgit.git
ls
adduser client
passwd client
sensors
ssh John@server
ssh root@server
ssh John@server
sensors
init 0
dmesg | grep -i acl
init 0
ssh John@server.com
ssh John@server
cd git
ls
scp -r ticgit.git/ John@server:/opt/git
scp -r ticgit.git/ root@server:/opt/git
ls
rm -rf ticgit.git/
ls
git clone root@server:/opt/git/ticgit.git
rm -rf ticgit
ls
ls -a ~
cd ~/.ssh
ls
ssh root@server
wall "I will shutdown my linux server..."
write client
init 0
su - client
yum install mutt.x86_64
mutt 
su - client
cd git
ls
su - client
etc.sh 
ls -a
ls -a | grep git
rm -rf .git
git status
cd git
ls
git clone https://github.com/libgit2/libgit2
cd libgit2/
ls
init 0
cd git
ls
cd simplegit-progit/
cat .git/HEAD 
cat .git/refs/heads/master 
git log
git cat-file -p e9a570524b63d2a2b3a7c3325acf5b89bbeb131e
git cat-file -p ca82a6dff817ec66f44342007202690a93763949
git lo
git log
git ls-tree -r cfda3bf379e4f8dba8717dee55aab78aef7f4daf
ls
git ls-files -s
tree
git status
git reset --soft HEAD~
git status
git reset HEAD~
git status
git checkout -- Rakefile
git checkout -- lib/simplegit.rb
git status
git log
git reflog
git reset --soft ca82a6dff817ec66f44342007202690a93763949
git lo
git log
git reset HEAD~
git status
git checkout -- lib/simplegit.rb
git status
git log
git reflog
git reset 085bb3b
git status
git log
git reflog
git reset ca82a6d
git status
git checkout -- Rakefile 
git status
git reset --soft HEAD~2
git status
git reflog
git reset ca82a6d
git status
git log
git log -v
ld
ls
vi Rakefile 
git status
git add .
git commit -m 'Add one line'
git log
git checkout ca82a6dff817ec66f44342007202690a93763949
ls
 vi Rakefile 
git log
git reflog
git checkout 9992a23
vi Rakefile 
git checkout ca82a6dff817ec66f44342007202690a93763949
vi Rakefile 
tree
etc.sh 
cat .git/HEAD 
git status
git log
git reflog
git checkout 9992a23
git status
git log
git reset ca82a6dff817ec66f44342007202690a93763949
git status
git reset --hard ca82a6dff817ec66f44342007202690a93763949
git status
vi Rakefile 
git reflog
git reset --hard 9992a23
cat Rakefile 
cd git
ls
cd libgit2/
git status
ls
echo add one line at last >> CONTRIBUTING.md 
git status
cat .git/HEAD 
cat refs/heads/master
cat ./git/refs/heads/master
cat .git/refs/heads/master
git log -p 2
git log 
git status --short
git status
ls -a | grep gitignore
cat .gitignore 
sensors
git status -s
git status --s
git status -short
git diff
git status -s
git status
git diff --staged
git diff
git log
git difftool --tool-help
echo $EDITOR
git status
git diff
git add CONTRIBUTING.md 
git status
git commit -m 'CONTRIBUTING.md add one line'
ls
echo readme > Readme
git status
git commit -a 'add new branchmarks'
git add Readme
git commit 'Add new branchmarks'
git commit -m 'Add new branchmarks'
git rm Readme 
git status
ls
ls | grep Readme
git reset HEAD Readme
ls | grep Readme
git status
git checkout -- Readme
ls | grep Readme
git log
git rm Readme 
git status
git commit -m 'Remove file Readme'
git log
git checkout 5610fc94f69fb222c4aa684ef3e8a79f2a9497ca
cat Readme 
git log
git reflog
git checkout 6a2b59f
touch readme
git status
git add .
git status
git rm --cached readme
git status
git add readme 
git rm --staged readme
git rm --cached readme
git status
git add readme
git commit -m 'Add file readme'
git status
mv readme Readme.txt
git status
git remove Readme.txt readme
mv Readme.txt readme
git status
cd ..
ls
cd simplegit-progit/
git status
git log
git checkout ca82a6df
git log -p -3
git log -2 --stat
git log -2 --short
git log --patch
git log --pretty=oneline
git log --pretty=formate:"%h %s"
git log --pretty=formate:"%h %s" --graph
git log --since=2.weeks
git log -S version
git log -p
git log -S SimpleGit.new
git --author Scott
git --author=Scott
git log --author Scott
git log --author Scott --grep version --all-match
git log  --grep version
git log  --grep verison
git log --author Scott --grep verison --all-match
ls
git log -- Rakefile
git log pretty="%h %s"
git log pretty= "%h %s"
git log pretty=formate  "%h %s"
git log pretty=formate: "%h %s"
git log --pretty="%h %s"
git status
git commit --amend
touch test.txt
git add test.txt 
git status
git reset HEAD test.txt 
git status
rm test.txt 
git status
git log --pretty=oneline
git log --pretty= "%h %s"
git log --pretty "%h %s"
git log --pretty="%h %s"
git log --patch
git log --pretty="%h %s"
cat Rakefile 
git log --pretty="%h %s"
git reset 085bb3b --hard
vi Rakefile 
git log --pretty="%h %s"
git reset 6b1bf1c --hard
cat Rakefile 
sensors
git clone https://github.com/schacon/ticgit
cd ticgit/
git remote
git remote -v
git remote add pb  https://github.com/paulboone/ticgit
git remote -v
git fetch pb
git branch
git branch --list
git log --pretty="%h %s" --graph
init 0
cd git/
LS
ls
git clone https://github.com/schacon/ticgit
cd ticgit/
ls
git remote
git remote show origin
git tag
git log
git tag -a v1.4 -m 'Version 1.4'
git show v1.4
git tag v1.4-lw
git tag
git show v1.4
git show v1.4-lw
git show v1.4
git log --pretty="%h %s"
git log --grep 'Rakefile'
git log --pretty=oneline --grep 'updated rakefile'
git log --pretty=oneline --grep 'rakefile'
git tag -a v1.2 d5a37607
git tag show v1.2
git tag
git show v1.2
git log -1
git log -1 HEAD
git log -2 HEAD
touch test.txt
git status
git add test.txt 
git status
git config --global alias.unstage 'reset HEAD --'
git unstage test.txt 
git status
git add test.txt 
git reset HEAD -- test.txt 
git status
sensors
git log --pretty=oneline --decorate
init 0
sensors
init 0
cd /root/山羊
ls
cat 羊场工作日记 | grep 9237
cat 羊场工作日记 | grep R
init 0
cd git
ls
cd libgit2/
ls
git branch
git branch --merged
git branch --no-merged
sensors
init 0
cd git
cd ticgit/
git remote
git ls-remote
git remote show
git pull
git branch
git branch -vv
cd /root/山羊/
ls
vi 九亩玉米耗资
vi 羊场工作日记 
init 0
ssh server
ssh git@server
ll /opt
ssh server
init 0
ssh server
init 0
init 6
md5sum Fedora-Live-KDE-x86_64-22-3.iso 
sha1sum Fedora-Live-KDE-x86_64-22-3.iso 
sha256sum Fedora-Live-KDE-x86_64-22-3.iso 
fdisk -l
fdisk -lh
fdisk -h
fdisk -l -b 1024
fdisk -l
ls /
ping 100.65.122.88
vi /etc/hosts
su - client
fdisk -l
df -h
sensors
fdisk -l
ls
su - client
ls /root
mv *.jpg Picture/
ls
su - clinet
su - client
du -sh
find /root -size +10M
find /root -size +10M | grep Fedora
find /root -size +10M | grep Fedora |xargs rm -f
find /root -size +10M | grep Fedora
find /root -size +10M | grep Fedora | xargs du -sh
find /root -size +10M | grep Fedora | xargs rm -f
find /root -size +10M | grep Fedora | xargs du -sh
find /root -size +10M | grep Fedora 
find /root -size +10M 
rm -rf git
find /root -size +10M 
find /root -size +10M  | grep progit
find /root -size +10M  | grep progit | xargs rm -f
find /root -size +10M  
du -sh
du -Sh
du -sh /root/*
find /root -maxdepth=1 -size +10M
man find
find /root -maxdepth 1 -size +10M
find /root -maxdepth 1
find /root -maxdepth 1 -size +1k
find /root -maxdepth 1 -size +10M
find /root -maxdepth 1 -size +10m
find /root -maxdepth 1 -size +10K
find /root -maxdepth 1 -size +10k
du -sh /root/*
du -sh /root/* | grep M
rm -rf /root/Download/*
rm -rf /root/vbird
rm -rf /root/c5
du -sh
find /root | grep \.git
rm -rf /root/regexpal
rm -rf /root/linux文章精選/.git
find /root | grep \.git
rm -rf /root/script/Bash_Scripts/.git
rm -rf /root/山羊/.git
rm -rf /root/Code/c5/c5ex/.git
find /root | grep \.git
cat .gitignore 
du -sh
ls
find /root | grep \.git
find Code/
find Code/ | grep \.git
rm -rf Code/c5/coreutils-5.0
du -sh
git init
git add -A
vi .gitignore 
git commit -m '20151019 Centos /root backup'
git status
firefox recent.html
find /root -maxdepth 1 | grep ^\.
find /root -maxdepth 1 | grep \/\.
find /root -maxdepth 1 | egrep '\/\.'
file /root/.cache
vi .gitignore
su - client
git status
file .cache/
git config --global core.quotepath false
git status
su - client
sensors
git add -A
git add .
su - client
git status
vi .gitignore
git status > status.txt
vi status.txt 
less status.txt 
ll | grep -v ^d | grep -v newwords | awk '{print $NF}'
ll | grep -v ^d | grep -v newwords 
man head
find /root | egrep '.gitignore'
rm -rf .git
git status
git init
less status.txt 
git status
git status | nl
man nl
git status | nl -l
man nl
git status | nl -b
man nl
git status | nl -b a
git status | sed '8,31p'
git status | sed -n '8,31p'
git status | sed -n '8,31p' >> .gitignore
git status
git status | nl -l
git status | nl -b  a
git status | sed -n '8,27p'
git status | sed -n '8,27p' > untrack.txt
init 6
ssh server
ping server
ssh root@server
ip add show ppp0
vi /etc/hosts
ssh server
vi .git
vi .gitignore 
git status
ls
vi .gitignore 
gthumb
ll | grep -v ^d
vi ignore 
vi uphost.sh 
mv uphost.sh Code/
ll | grep -v ^d | grep -v newwords 
ll | grep -v ^d | grep -v newwords | awk '{print $NF}' | tail -n +2
ll | grep -v ^d | grep -v newwords | awk '{print $NF}' | tail -n +2 | xargs rm -f
ls
cd bar-1.4/
ls
cd 
cd c 
ls
cd -
rm -rf c
ls Code/
cd 
rm -rf grep-2.0/
ls goat-documents/
ls
cd 山羊 
ls
mkdir 文献
cd
mv goat-documents/* 山羊/文献/
ls goat-documents/
rm -rf goat-documents/
cd
ls
cd lm_sensors/
ls
cd
mkdir application
mv lm_sensors/ bar-1.4/ application/
ls
ls vbird-wget/
rm -rf vbird-wget/
ls asm
vi .gitignore 
ls
ls Download/
rm -rf nmap-mac-dir/
rm -rf s1kbfd.df34d3f.com/
ls wget/
rm -rf wget/
ls Code
mv script/ Code
ls
ls Code
cd Code/
ls script/
ls script/Bash_Scripts/
mv script/Bash_Scripts/ .
ls
ls script/
rm -rf script/
ls
ls Bash_Scripts/
which addnew.sh
cp /usr/local/bin/addnew.sh ./Bash_Scripts/
cp /usr/local/bin/readnew.sh ./Bash_Scripts/
mv uphost.sh Bash_Scripts/
cd
ls
mv number_goats/ 山羊
rm -rf testdir/
ls linux-vbird/
vi linux-vbird/regular_express.txt 
rm -rf linux-vbird/
ls
git status > status.txt
less status.txt 
vi .gitignore
git status
git status | egrep '^.'
vi .gitignore 
