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