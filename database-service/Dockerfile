FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD root123
ENV MYSQL_DATABASE qa_dashboard
ENV MYSQL_USER qa_user
ENV MYSQL_PASSWORD pass123

ADD setup.sql /docker-entrypoint-initdb.d
