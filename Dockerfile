FROM public.ecr.aws/lambda/nodejs:12

RUN yum -y install bzip2-devel freetype-devel libjpeg-devel libpng-devel libtiff-devel giflib-devel zlib-devel ghostscript-devel djvulibre-devel libwmf-devel jasper-devel libtool-ltdl-devel libX11-devel libXext-devel libXt-devel lcms-devel libxml2-devel librsvg2-devel OpenEXR-devel php-devel

RUN yum install -y tar wget
RUN wget https://www.imagemagick.org/download/ImageMagick.tar.gz

COPY sample.png ./

RUN tar xvzf ImageMagick.tar.gz
RUN cd ImageMagick* \ 
      && ls -al && sleep 10 \
      && ./configure \
      # && make \
      # && make install \
      # && magick identify ../sample.png