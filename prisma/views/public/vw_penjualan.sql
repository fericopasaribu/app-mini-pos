SELECT
  penjualan.id,
  penjualan.kode,
  penjualan.tanggal,
  penjualan.jumlah,
  penjualan.harga,
  penjualan.id_barang,
  barang.kode AS kode_barang,
  barang.nama AS nama_barang,
  barang.id_satuan,
  satuan.nama AS nama_satuan
FROM
  (
    (
      tb_penjualan penjualan
      JOIN tb_barang barang ON ((penjualan.id_barang = barang.id))
    )
    JOIN tb_satuan satuan ON ((barang.id_satuan = satuan.id))
  );