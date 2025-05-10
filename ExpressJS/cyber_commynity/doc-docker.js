// doc câu lệnh CLI: https://docs.docker.com/reference/cli/docker/

/**
 * 
 * 
 * TERMINAL ------------------------------------------
 * xem logs của một container:
 *    docker logs id_hoac_name_cua_container
 * 
 * xem địa chỉ IP của một container
 *    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_DB_SQL_container
 * 
 * IMAGE ------------------------------------------
 * 
 * build:
 *    docker build -t ten_cua_image .
 *       dấu chấm (.): chỉ định đường dẫn của file Dockerfile
 * 
 * delete:
 *    docker image remove ten_hoac_id_cua_image
 * 
 * list các image đang có:
 *    docker image list / docker image ls
 * 
 * đưa image lên docker hub:
 *    docker push ten_hoac_id_cua_image
 *
 * CONTAINER ------------------------------------------
 * 
 * run: chạy máy, bật máy
 *    docker container run --name ten_cua_container -p 3070:3069 -d ten_hoac_id_cua_image
 * 
 * list:
 *    docer container list
 *       - lấy ra tất cả container online
 *       - list: ghi tắt là ls
 *    docer container list -a
 *       - lấy ra tất cả các container online và offline
 * 
 * Xoá:
 *    docker container remove ten_hoac_id_cua_container
 *    docker container rm ten_hoac_id_cua_container
 * 
 * dừng:
 *    docker container stop ten_hoac_id_cua_container
 * 
 * DOCKER-COMPOSE -------------------------------
 * docker compose up -d
 * 
 * docker compose down
 * 
 * câu lệnh dùng trong ubuntu
 * 
 *  ls -la: show tất cả các folder đang có
 * 
 * online runner không chiếm terminal:
 *    - sudo ./svc.sh install
 *    - sudo ./svc.sh start
 * 
 * đọc file:
 *    - nano ten_file
 * save file:
 *    - ctrl + o
 *    - ctrl + x: thoát
 * 
 * tạo file:
 *    - touch ten_file
 * 
 * kẹp quyền sudo:
 *    - sudo su
 * thoát quyền sudo:
 *    - exit
 * 
 * dùng nginx để dấu port:
 * sudo apt update
 * sudo apt install nginx
 * 
 * mở tệp cấu hình:
 * sudo nano /etc/nginx/sites-available/default
 * 
 * xoá nhanh bên trong nano: ctrl + K
 * 
 * lệnh chạy kiểm tra xem cấu hình đã oke chưa:
 * sudo nginx -t
 * 
 * lệnh khởi động nginx áp dụng các thay đổi của cấu hình:
 * sudo systemctl restart nginx
 * 
 */