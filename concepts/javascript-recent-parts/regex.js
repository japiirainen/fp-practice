var msg = 'Hello World lol word {{ package }} words'
console.log(msg.match(/()/))
//look ahead
console.log(msg.match(/(l.)/g))
console.log(msg.match(/(l.)$/g))
console.log(msg.match(/(l.)(?=o)/g))
console.log(msg.match(/(l.)(?!o)/g))

//look behind
console.log(msg.match(/(?<=e)(l.)/g))
console.log(msg.match(/(?<!e)(l.)/g))

const req = /\{{\s*([a-z]+?)\s*\}}/g
const re = /\{{\s*([a-z]+?)\s*\}}/

const lause = '{{ package }} lol {{ pilalla }} <h1></h1> {{ kaikki }}'

console.log(lause.match(req))
const pakg = lause.match(req)[1]
const pilalla = lause.match(req)[2]
console.log(pakg.match(re)[1])
console.log(pakg)
console.log(pilalla)

//exercise

var poem = `
The power of a gun can kill and the power of fire can burn the power of wind can chill and the power of a mind can learn the power of anger can rage inside until it tears u apart but the power of a smile especially yours can heal a frozen heart
`

function* powers(poem) {
  var re = /(?<=power of)(?<thing>(?:a)?\w+).*?(?<=can )(?<verb>\w+)/gs
  var match
  while ((match = re.exec(poem))) {
    let {
      groups: { thing, verb },
    } = match
    yield `${thing}: ${verb}`
  }
}

for (let power of powers(poem)) {
  console.log(power)
}
// a gun: kill
// fire: burn
// wind: chill
// a mind: learn
// anger: rage
// smile: heal

const str = `
            Package: linux-modules-5.3.0-1032-aws
            Status: install ok installed
            Priority: optional
            Section: kernel
            Installed-Size: 64641
            Maintainer: Ubuntu Kernel Team <kernel-team@lists.ubuntu.com>
            Architecture: amd64
            Source: linux-aws-5.3
            Version: 5.3.0-1032.34~18.04.2
            Description: Linux kernel extra modules for version 5.3.0 on 64 bit x86 SMP
            Contains the corresponding System.map file, the modules built by the
            packager, and scripts that try to ensure that the system is not left in an
            unbootable state after an update.
            .
            Supports AWS processors.
            .
            Geared toward Amazon Web Services (AWS) systems.
            .
            You likely do not want to install this package directly. Instead, install
            the linux-aws meta-package, which will ensure that upgrades work
            correctly, and that supporting packages are also installed.

            Package: libnpth0
            Status: install ok installed
            Priority: optional
            Section: libs
            Installed-Size: 32
            Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
            Architecture: amd64
            Multi-Arch: same
            Source: npth
            Version: 1.5-3
            Depends: libc6 (>= 2.17)
            Description: replacement for GNU Pth using system threads
            nPth is a non-preemptive threads implementation using an API very
            similar to the one known from GNU Pth. It has been designed as a
            replacement of GNU Pth for non-ancient operating systems. In
            contrast to GNU Pth it is based on the system's standard threads
            implementation. Thus nPth allows the use of libraries which are not
            compatible to GNU Pth.
            Original-Maintainer: Eric Dorland <eric@debian.org>
            Homepage: https://www.gnupg.org/

            Package: linux-modules-5.3.0-1032-aws
            Status: install ok installed
            Priority: required
            Section: utils
            Installed-Size: 427
            Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
            Architecture: amd64
            Multi-Arch: foreign
            Source: util-linux
            Version: 2.31.1-0.4ubuntu3.6
            Replaces: util-linux (<< 2.30.1-0ubuntu4~)
            Depends: libc6 (>= 2.14), libfdisk1 (>= 2.31.1), libmount1 (>= 2.24.2), libncursesw5 (>= 6), libsmartcols1 (>= 2.28~rc1), libtinfo5 (>= 6)
            Breaks: util-linux (<< 2.30.1-0ubuntu4~)
            Description: collection of partitioning utilities
            This package contains the classic fdisk, sfdisk and cfdisk partitioning
            utilities from the util-linux suite.
            .
            The utilities included in this package allow you to partition
            your hard disk. The utilities supports both modern and legacy
            partition tables (eg. GPT, MBR, etc).
            .
            The fdisk utility is the classical text-mode utility.
            The cfdisk utilitity gives a more userfriendly curses based interface.
            The sfdisk utility is mostly for automation and scripting uses.
            Important: yes
            Original-Maintainer: LaMont Jones <lamont@debian.org>

            Package: bind9-host
            Status: install ok installed
            Priority: standard
            Section: net
            Installed-Size: 174
            Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
            Architecture: amd64
            Source: bind9
            Version: 1:9.11.3+dfsg-1ubuntu1.12
            Provides: host
            Depends: libbind9-160 (= 1:9.11.3+dfsg-1ubuntu1.12), libdns1100 (= 1:9.11.3+dfsg-1ubuntu1.12), libisc169 (= 1:9.11.3+dfsg-1ubuntu1.12), libisccfg160 (= 1:9.11.3+dfsg-1ubuntu1.12), liblwres160 (= 1:9.11.3+dfsg-1ubuntu1.12), libc6 (>= 2.4)
            Description: DNS lookup utility (deprecated)
            This package provides /usr/bin/host, a simple utility (bundled with the
            BIND 9.X sources) which can be used for converting domain names to IP
            addresses and the reverse.
            .
            This utility is deprecated, use dig or delv from the dnsutils package.
            Homepage: https://www.isc.org/downloads/bind/
            Original-Maintainer: Debian DNS Packaging <pkg-dns-devel@lists.alioth.debian.org>`

const pkgNameRegex = /(?<=Package: )([\w'-.]+)(?<some>(?:a)?\w+)/g
const pkgDescRegex = /(?<=Description: )([\w'-. ]+)(?<some>(?:a)?\w+)/g
const pkgDependsRegex = /(?<=Depends: )(?<some>(?:a)?\w+)/g

console.log(str.match(pkgNameRegex))
console.log(str.match(pkgDescRegex))
console.log(str.match(pkgDependsRegex))

/*Name
Description
The names of the packages the current package depends on (skip version numbers)
Reverse dependencies, i.e. the names of the packages that depend on the current package */
