FROM public.ecr.aws/lambda/nodejs:12

RUN yum -y install bzip2-devel freetype-devel libjpeg-devel libpng-devel libtiff-devel giflib-devel zlib-devel ghostscript-devel djvulibre-devel libwmf-devel jasper-devel libtool-ltdl-devel libX11-devel libXext-devel libXt-devel lcms-devel libxml2-devel librsvg2-devel OpenEXR-devel php-devel

RUN curl -O https://www.imagemagick.org/download/ImageMagick.tar.gz
RUN yum install -y tar
RUN tar xvzf ImageMagick.tar.gz
RUN cd ImageMagick*
RUN ./configure
RUN make
RUN make install
RUN magick identify sample.png