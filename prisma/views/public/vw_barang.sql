SELECT
  barang.id,
  barang.kode,
  barang.nama,
  barang.harga,
  barang.id_satuan,
  satuan.nama AS nama_satuan
FROM
  (
    tb_barang barang
    JOIN tb_satuan satuan ON ((barang.id_satuan = satuan.id))
  );