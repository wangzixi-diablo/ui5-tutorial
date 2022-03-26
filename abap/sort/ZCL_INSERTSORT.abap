class ZCL_INSERTSORT definition
  public
  final
  create public .

public section.

  class-methods SORT
    importing
      !IV_TABLE type ABADR_TAB_INT4
    returning
      value(RV_RESULT) type ABADR_TAB_INT4 .
protected section.
private section.
ENDCLASS.



CLASS ZCL_INSERTSORT IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_INSERTSORT=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_RESULT                      TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  method SORT.
    rv_result = iv_table.
    DATA(lv_len) = lines( iv_table ).
    DATA(i) = 2.
    WHILE i <= lv_len.
       DATA(key) = rv_result[ i ].
       DATA(j) = i - 1.
       WHILE j >= 1 AND rv_result[ j ] > key.
          rv_result[ j + 1 ] = rv_result[ j ].
          j = j - 1.
       ENDWHILE.
       rv_result[ j + 1 ] = key.
       i = i + 1.
    ENDWHILE.

  endmethod.
ENDCLASS.