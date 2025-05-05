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
 * DOCKER-COMPOSE -------------------------------
 * docker-compose up -d
 * 
 */