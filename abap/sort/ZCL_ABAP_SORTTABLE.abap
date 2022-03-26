class ZCL_ABAP_SORTTABLE definition
  public
  final
  create public .

public section.

  class-methods SORT
    importing
      !IV_TABLE type ABADR_TAB_INT4
    returning
      value(RV_TABLE) type ABADR_TAB_INT4 .
protected section.
private section.
ENDCLASS.



CLASS ZCL_ABAP_SORTTABLE IMPLEMENTATION.


* <SIGNATURE>---------------------------------------------------------------------------------------+
* | Static Public Method ZCL_ABAP_SORTTABLE=>SORT
* +-------------------------------------------------------------------------------------------------+
* | [--->] IV_TABLE                       TYPE        ABADR_TAB_INT4
* | [<-()] RV_TABLE                       TYPE        ABADR_TAB_INT4
* +--------------------------------------------------------------------------------------</SIGNATURE>
  method SORT.
    DATA: lt_sorted TYPE ZTSORTED_INT4.
    LOOP AT iv_table ASSIGNING FIELD-SYMBOL(<item>).
       INSERT <item> INTO table lt_sorted.
    ENDLOOP.

    APPEND LINES OF lt_sorted TO rv_table.
  endmethod.
ENDCLASS.