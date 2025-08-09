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