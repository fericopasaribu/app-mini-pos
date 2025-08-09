CREATE VIEW vw_barang AS
SELECT
    barang.id,
    barang.kode,
    barang.nama,
    barang.harga,
    barang.foto,
    barang.id_satuan,
    satuan.nama AS nama_satuan
FROM
    (
        tb_barang barang
        JOIN tb_satuan satuan ON ((barang.id_satuan = satuan.id))
    );

CREATE VIEW vw_penjualan AS
SELECT
    penjualan.id,
    penjualan.kode,
    penjualan.harga,
    penjualan.jumlah,
    penjualan.tanggal,
    penjualan.id_barang,
    barang.kode AS kode_barang,
    barang.nama AS nama_barang,
    barang.id_satuan,
    satuan.nama AS nama_satuan,
    (penjualan.harga * penjualan.jumlah) AS total
FROM
    (
        (
            tb_penjualan penjualan
            JOIN tb_barang barang ON ((penjualan.id_barang = barang.id))
        )
        JOIN tb_satuan satuan ON ((barang.id_satuan = satuan.id))
    );

CREATE VIEW vw_penjualan_group AS
SELECT
    penjualan.kode,
    max(penjualan.tanggal) AS tanggal,
    count(penjualan.jumlah) AS item,
    sum((penjualan.harga * penjualan.jumlah)) AS total
FROM
    (
        (
            tb_penjualan penjualan
            JOIN tb_barang barang ON ((penjualan.id_barang = barang.id))
        )
        JOIN tb_satuan satuan ON ((barang.id_satuan = satuan.id))
    )
GROUP BY
    penjualan.kode;